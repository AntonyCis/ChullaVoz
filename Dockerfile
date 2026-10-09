# Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/SentimentHub.API/SentimentHub.API.csproj", "src/SentimentHub.API/"]
COPY ["src/SentimentHub.Core/SentimentHub.Core.csproj", "src/SentimentHub.Core/"]

RUN dotnet restore "src/SentimentHub.API/SentimentHub.API.csproj"

COPY . .

RUN dotnet build "src/SentimentHub.API/SentimentHub.API.csproj" -c Release -o /app/build

RUN dotnet publish "src/SentimentHub.API/SentimentHub.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5189
ENV ASPNETCORE_URLS=http://+:5189

ENTRYPOINT ["dotnet", "SentimentHub.API.dll"]