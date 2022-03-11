
import style from '../style/Landing.module.scss'
import { Home } from './Home';

export function PageLanding ()
{
   return(<>
    <header className={style.pageHeader}>hey it is the header</header>
    <button onClick={<Home/>}>Home</button>
    <footer className={style.pageFooter}>hey it is the footer</footer>
    </>
   );
}
