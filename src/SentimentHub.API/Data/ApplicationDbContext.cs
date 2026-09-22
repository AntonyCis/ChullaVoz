using Microsoft.EntityFrameworkCore;
using SentimentHub.Core.Entities;

namespace SentimentHub.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<Review> Reviews { get; set; }
    public DbSet<SentimentAnalysis> SentimentAnalyses { get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuracion de relacion entre Review -> SentimentAnalysis
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Analysis)
            .WithOne(a => a.Review)
            .HasForeignKey<SentimentAnalysis>(a => a.ReviewId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}