using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Azure.IoTHub.CloudToDevice.API.Model;
using Microsoft.Azure.Devices;
using System.Text;

namespace Azure.IoTHub.CloudToDevice.API.Controllers
{
    [Produces("application/json")]
    [Route("api/CloudToDevice")]
    public class CloudToDeviceController : Controller
    {
        private static string connectionString = "your-azure-iothub-primaryKey-connectionString";
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CloudToDeviceMessage message)
        {
            try
            {
                var serviceClient = ServiceClient.CreateFromConnectionString(connectionString);
                var commandMessage = new Message(Encoding.ASCII.GetBytes(message.Message));
                await serviceClient.SendAsync(message.DeviceId, commandMessage);

                return new OkObjectResult(message);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return new ObjectResult(new Exception(ex.Message));
            }
            
        }
    }
}