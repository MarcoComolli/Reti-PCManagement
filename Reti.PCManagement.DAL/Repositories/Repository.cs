using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Repositories
{
    public abstract class Repository<Model> where Model : new()
    {

        public List<Model> ToList(IDbCommand command)
        {
            using (var reader = command.ExecuteReader())
            {
                List<Model> items = new List<Model>();
                while (reader.Read())
                {
                    items.Add(Map(reader));
                }
                return items.ToList(); ;
            }
        }
        protected abstract Model Map(IDataRecord record);
    }

}
