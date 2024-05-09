import { useSelector } from 'react-redux';
import { selectFavoriteProduct } from '../../redux/features/favorites/favoriteSlice.js';
import Product from './Product';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct)
  return (
    <div className='pt-[10rem] px-[5rem] w-[100vw]'>
      <h1 className='text-lg font-bold'>Favorites</h1>

      <div className="flex flex-wrap w-full h-full items-center ">
        {favorites.map((product) => (
            <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
