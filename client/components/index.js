/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {default as AllProducts} from './AllProducts';
export {default as Orders} from './Orders';
export {default as SingleOrder} from './SingleOrder';
export {default as Navbar} from './Navbar';
export {default as Footer} from './Footer';
export {Help} from './Help';
export {About} from './About';
export {Contact} from './Contact';
export {default as SingleProduct} from './SingleProduct';
export {default as AllUsers} from './AllUsers';
export {default as EditUserForm} from './EditUserForm';
export {default as Cart} from './Cart';
export {default as SearchProducts} from './SearchProducts';
export {SingleProductCard} from './SingleProductCard';
export {FilteredProducts} from './FilteredProducts';
export {default as AccountPage} from './AccountPage';
export {OrderConfirmation} from './OrderConfirmation';
