import React from "react"
import ContentLoader from "react-content-loader"
import commonStyles from './commonStyles.module.scss'

const SkeletonTask = () => (
    <div className={commonStyles.border}>
        <ContentLoader
            speed={2}
            width={570}
            height={50}
            viewBox="0 0 570 50"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            <rect x="168" y="51" rx="3" ry="3" width="150" height="14" />
            <circle cx="26" cy="24" r="11" />
            <rect x="51" y="13" rx="5" ry="5" width="383" height="22" />
            <rect x="467" y="13" rx="5" ry="5" width="80" height="22" />
            <rect x="181" y="44" rx="0" ry="0" width="0" height="1" />
        </ContentLoader>
    </div>

)

export default SkeletonTask