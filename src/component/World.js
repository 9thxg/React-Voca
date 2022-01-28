import Welcome from "./Welcome";
import "./World.css";
import styles from "./World.module.css";

const World = () => {
    return(
        <div>
            <h2>World !</h2>
            <div className="box">이건 World box</div>
            <div className={styles.box}>이건 World box2</div>
            <Welcome/>
        </div>
    ) 
};

export default World;