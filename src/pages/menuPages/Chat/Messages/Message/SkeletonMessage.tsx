import React from "react"
import styles from './Message.module.scss'

import ContentLoader from "react-content-loader"
import {useAdminAuth} from "../../../../../hooks/useAdminAuth";


const SkeletonMessage = () => {
    const isAdmin = useAdminAuth()


    return (
        <div className={styles.skeletonWrapper}>
            <ContentLoader
                speed={2}
                width={1140}
                height={28}
                viewBox="0 0 1140 28"
                backgroundColor="#ffffff"
                foregroundColor="#cbf2f2"
            >
                <rect x="0" y="0" rx="5" ry="5" width="64" height="28"/>
                <rect x="1063.5" y="0" rx="5" ry="5" width="42" height="28"/>
                {isAdmin && <circle cx="1128" cy="14" r="10"/>}

                <rect x="67" y="0" rx="5" ry="5" width="994" height="28"/>
            </ContentLoader>
        </div>


    )
}


export default SkeletonMessage
