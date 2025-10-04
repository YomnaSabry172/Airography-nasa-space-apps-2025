using AppCore.DTOs;
using AppCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Airography.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        public DataController() 
        {

        }

        [HttpGet]
        [Route("openaq")]
        public async Task<AirDataDTO> GetOpenAQData(float latitude, float longitude)
        {
            OpenAQManagementService openAQManagementService = new OpenAQManagementService();
            return await openAQManagementService.GetOpenAQDataForLocation(latitude, longitude);
        }
    }
}
