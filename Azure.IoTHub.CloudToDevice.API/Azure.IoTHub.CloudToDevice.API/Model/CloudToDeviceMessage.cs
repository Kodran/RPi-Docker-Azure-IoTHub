using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Azure.IoTHub.CloudToDevice.API.Model
{
    public class CloudToDeviceMessage
    {
        public string DeviceId { get; set; }
        public string Message { get; set; }
    }
}
