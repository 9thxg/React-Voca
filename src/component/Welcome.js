import "./Welcome.css";
import styles from "./Welcome.module.css";

export default function Welcome() {
    return (
        <div>
            <div className="box">이건 Welcome box</div>
            <div className={styles.box}>이건 Welcome box2</div>
            <h3>Welcome</h3>
        </div>
    )
}