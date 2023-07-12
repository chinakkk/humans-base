import React from "react";
import ContentLoader from "react-content-loader"
import styles from './BorderCardHuman.module.scss'

const SkeletonCardHuman = () => (
    <div className={styles.border}>


        <ContentLoader
            speed={2}
            height={170}
            viewBox="0 0 250 170"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            <rect className={styles.skeletonPhoto} x="23" y="23" rx="14" ry="14" />
            <rect className={styles.skeletonName} x="168" y="51" rx="3" ry="3" width="80" height="14" />
            <rect className={styles.skeletonName} x="168" y="30" rx="3" ry="3" width="80" height="14" />
        </ContentLoader>

    </div>

)

export default SkeletonCardHuman