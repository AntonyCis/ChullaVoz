using SentimentHub.Core.Entities;
using SentimentHub.Core.Enums;
using RestSharp;
using System.Text.Json;

namespace SentimentHub.API.Services;

public class SentimentAnalysisService : ISentimentAnalysisService
{
    private readonly IConfiguration _configuration;
    private readonly RestClient _client;
    private const string ModelId = "nlptown/bert-base-multilingual-uncased-sentiment";

    public SentimentAnalysisService(IConfiguration configuration)
    {
        _configuration = configuration;
        _client = new RestClient($"https://api-inference.huggingface.co/models/{ModelId}");
    }

    public async Task<SentimentAnalysis> AnalyzeReviewAsync(string content)
    {
        try
        {
            var hfToken = _configuration["HuggingFace:ApiKey"];

            var request = new RestRequest("/", Method.Post);
            request.AddHeader("Authorization", $"Bearer {hfToken}");
            request.AddJsonBody(new {inputs = content});

            var response = await _client.ExecuteAsync(request);

            if (!response.IsSuccessful)
            {
                // Fallback: analisis simple si la API le da la gana de fallar jaja
                return CreateFallbackAnalysis(content);
            }

            var result = JsonSerializer.Deserialize<List<List<Dictionary<string, object>>>>(response.Content);

            if(result == null || result.Count == 0)
                return CreateFallbackAnalysis(content);

            var predictions = result[0];
            var topPrediction = predictions.OrderByDescending(p => double.Parse(p["score"].ToString() ?? "0")).First();

            var label = topPrediction["label"].ToString() ?? "NEUTRAL";
            var score = double.Parse(topPrediction["score"].ToString() ?? "0.5");

            var sentiment = label.ToUpper() switch
            {
                "POSITIVE" or "5 STARS" => SentimentType.Positive,
                "NEGATIVE" or "1 STARS" => SentimentType.Negative,
                _ => SentimentType.Neutral
            };

            return new SentimentAnalysis
            {
                Sentiment = sentiment,
                Confidence = score,
                Topics = ExtractTopics(content)
            };
        }
        catch (Exception ex)
        {
            // Log error y retorna analisis fallback
            Console.WriteLine($"Error en análisis de sentimiento: {ex.Message}");
            return CreateFallbackAnalysis(content);
        }
    }

    private SentimentAnalysis CreateFallbackAnalysis(string content)
    {
        // Analisis simple basado en palabras clave en spanish
        var positivoWords = new[] {"excelente", "bueno", "genial", "perfecto", "maravilloso", "fantástico", "amor", "adoró"};
        var negativoWords = new[] {"malo", "terrible", "horrible", "pésimo", "decepción", "mediocre", "lentitud" };

        var contentLower = content.ToLower();
        var posCount = positivoWords.Count(w => contentLower.Contains(w));
        var negCount = negativoWords.Count(w => contentLower.Contains(w));

        var sentiment = posCount > negCount ? SentimentType.Positive
                        : negCount > posCount ? SentimentType.Negative
                        : SentimentType.Neutral;

        return new SentimentAnalysis
        {
            Sentiment = sentiment,
            Confidence = 0.6,
            Topics = ExtractTopics(content)
        };
    }

    private List<string> ExtractTopics(string content)
    {
        var topics = new List<string>();
        var topicKeywords = new Dictionary<string, string[]>
        {
            { "Atención", new[] { "atención", "servicio", "atencion", "personal", "camarero", "mesero" } },
            { "Precio", new[] { "precio", "caro", "barato", "costo", "tarifa", "valor" } },
            { "Calidad", new[] { "calidad", "comida", "producto", "sabor", "fresco", "limpio" } },
            { "Ambiente", new[] { "ambiente", "música", "decoración", "limpieza", "ruido", "luz" } },
            { "Rapidez", new[] { "rápido", "lento", "espera", "demora", "velocidad", "rapido" } }
        };

        var contentLower = content.ToLower();
        foreach(var topic in topicKeywords)
        {
            if(topic.Value.Any(keyword => contentLower.Contains(keyword)))
                topics.Add(topic.Key);
        }

        return topics.Count > 0 ? topics : new List<string> { "General" };
    }
}