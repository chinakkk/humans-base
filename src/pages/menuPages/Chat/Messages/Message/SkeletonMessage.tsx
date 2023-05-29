import React from "react"
import styles from './Message.module.scss'

import ContentLoader from "react-content-loader"


const SkeletonMessage = () => (
    <div className={styles.skeletonWrapper}>
        {/*<ContentLoader*/}
        {/*    speed={1}*/}
        {/*    width={1140}*/}
        {/*    height={28}*/}
        {/*    viewBox="0 0 1140 28"*/}
        {/*    backgroundColor="#ffffff"*/}
        {/*    foregroundColor="#ededed"*/}
        {/*>*/}
        {/*    <rect x="168" y="51" rx="3" ry="3" width="150" height="14" />*/}
        {/*    <rect x="181" y="44" rx="0" ry="0" width="0" height="1" />*/}
        {/*    <rect x="0" y="0" rx="5" ry="5" width="1105" height="28" />*/}
        {/*</ContentLoader>*/}
        <ContentLoader
            speed={2}
            width={1140}
            height={28}
            viewBox="0 0 1140 28"
            backgroundColor="#ffffff"
            foregroundColor="#cbf2f2"
        >
            <rect x="0" y="0" rx="5" ry="5" width="64" height="28" />
            <rect x="1063.5" y="0" rx="5" ry="5" width="42" height="28" />
            <circle cx="1128" cy="14" r="10" />
            <rect x="67" y="0" rx="5" ry="5" width="994" height="28" />
        </ContentLoader>
    </div>


)

export default SkeletonMessage
