import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice.js';
import Product from './Product';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct)
  return (
    <div className='pt-[10rem] px-[5rem] w-[100vw] overflow-x-hidden '>
      <h1 className='text-[1.5rem] font-bold'>Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full h-full place-items-center gap-[4.8rem]">
        {favorites.map((product) => (
            <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
