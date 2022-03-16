import {Link} from "react-router-dom";
import styles from "./Navigation.module.scss";

export const Navigation = () => {

    return (
        <div className={styles.navigation}>
            <Link to={"/converter"}>Currency converter</Link>
            <Link to={"/exchange_rates"}>Exchange rates</Link>
        </div>
    );
}