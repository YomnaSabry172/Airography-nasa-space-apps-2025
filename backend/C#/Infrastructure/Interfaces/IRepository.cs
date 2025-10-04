using Domain.Entities;
using System.Linq.Expressions;

namespace Infrastructure.Interfaces
{
    public interface IRepository<T, TKey> : IUnitOfWork
        where T : BaseEntity<TKey>
        where TKey : IEquatable<TKey>
    {
        Task<T> GetByIdAsync(TKey id, params Expression<Func<T, object>>[] includes);
        Task InsertAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(TKey id);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            params Expression<Func<T, object>>[] includes);

        Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            params Expression<Func<T, object>>[] includes);

        Task<T> GetByIdNestedSearchAsync(TKey id, int maxLevel = 4);
        Task<IEnumerable<T>> FindNestedSearchAsync(Expression<Func<T, bool>> filter = null,
            int maxLevel = 4,
    Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null);

        Task<IEnumerable<T>> GetAllNestedSearchAsync(int maxLevel = 4, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null);
    }
}
