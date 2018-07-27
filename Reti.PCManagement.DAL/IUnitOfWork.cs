using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL
{
    public interface IUnitOfWork : IDisposable
    {
        bool ApplyChanges();
    }
}
