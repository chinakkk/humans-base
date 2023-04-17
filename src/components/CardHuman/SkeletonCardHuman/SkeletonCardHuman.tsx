import React from "react";
import ContentLoader from "react-content-loader"
import styles from './SkeletonCardHuman.module.scss'

const SkeletonCardHuman = () => (
    <div className={styles.container}>
        <ContentLoader
            speed={2}
            width={370}
            height={170}
            viewBox="0 0 370 170"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            <rect x="23" y="23" rx="14" ry="14" width="124" height="124" />
            <rect x="168" y="51" rx="3" ry="3" width="150" height="14" />
            <rect x="168" y="30" rx="3" ry="3" width="150" height="14" />
        </ContentLoader>
    </div>

)

export default SkeletonCardHuman