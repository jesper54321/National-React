import style from './home.module.scss'

export const Home = () => {
    return ( 
        <div className={style.classhome}>
        <h1>this is the home page</h1>
        <a href="/login">go to Login</a>
        </div>
    )
}