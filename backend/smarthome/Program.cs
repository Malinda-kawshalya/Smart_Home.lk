using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using YourNamespace.Models; // Update with your actual namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// ?? Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartHome API", Version = "v1" });
});

// ?? Configure your DbContext
builder.Services.AddDbContext<DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();              // Serve Swagger JSON
    app.UseSwaggerUI(c =>          // Serve Swagger UI
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartHome API V1");
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
