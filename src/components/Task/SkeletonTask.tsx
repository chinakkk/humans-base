import React from "react"
import ContentLoader from "react-content-loader"
import commonStyles from './commonStyles.module.scss'

const SkeletonTask = () => (
    <div className={commonStyles.border} style={{ width: "100%", height: "50px" }}>
        <ContentLoader
            className={commonStyles.skeleton}
            speed={2}
            width="100%"
            height="100%"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
        >
            <circle cx="26" cy="24" r="12"/>
            <rect x="51" y="13" rx="5" ry="5" width="85%" height="22"/>
            {/*<rect x="467" y="13" rx="5" ry="5" width="80" height="22"/>*/}

            {/*<rect x="168" y="51" rx="3" ry="3" width="26%" height="14" />*/}
            {/*<rect x="181" y="44" rx="0" ry="0" width="0" height="1" />*/}

        </ContentLoader>
    </div>

)

export default SkeletonTask