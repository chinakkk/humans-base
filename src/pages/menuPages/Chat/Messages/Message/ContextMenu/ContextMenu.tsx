import styles from './ContextMenu.module.scss'
import {FC, useEffect, useRef, useState} from "react"
import {ref, remove} from "firebase/database";
import {realTimeDB} from "../../../../../../firebase";
import {messageType} from "../../../../../../types/types";

type ContextMenuProps = {
    isUserContextMenu: boolean;
    messageObj: messageType;
    setContextMenuIsOpen: (value: boolean) => void;
    contextMenuIsOpen: boolean;
    mouseX: number;
    mouseY: number;
    setContextMenuMessagesIsOpen: (value: boolean) => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
                                               isUserContextMenu,
                                               contextMenuIsOpen,
                                               messageObj,
                                               setContextMenuIsOpen,
                                               mouseX,
                                               mouseY,
                                               setContextMenuMessagesIsOpen
                                           }) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const [openAnimation, setOpenAnimation] = useState(false)
    useEffect(() => {
        if (overlayRef.current) {
            overlayRef.current.addEventListener('contextmenu', (event) => {
                event.preventDefault()
                setOpenAnimation(false)
                setTimeout(() => {
                    setContextMenuIsOpen(false)
                }, 200)
                setContextMenuMessagesIsOpen(false)
            })
            overlayRef.current.addEventListener('click', (event) => {
                event.preventDefault()
                setOpenAnimation(false)
                setTimeout(() => {
                    setContextMenuIsOpen(false)
                }, 200)
                setContextMenuMessagesIsOpen(false)
            })

        }
        setTimeout(() => {
            setOpenAnimation(true)
        }, 1)

    }, [])
    const onClickDelete = () => {
        setOpenAnimation(false)
        setTimeout(() => {
            setContextMenuIsOpen(false)
        }, 200)
        remove(ref(realTimeDB, `/${messageObj.uuid}`)).then().catch(() => console.log('Не удалось удалить сообщение.'))
    }
    const onClickCopy = () => {
        setOpenAnimation(false)
        setTimeout(() => {
            setContextMenuIsOpen(false)
        }, 200)
        navigator.clipboard.writeText(messageObj.inputMessage).then().catch(() => console.log('Не удалось скопировать.'))
    }
    return (
        <div className={styles.container} ref={overlayRef}>
            <div className={styles.overlay}>
                <div
                    className={`${styles.contextMenu} ${openAnimation ? styles.contextMenuActive : ''} ${isUserContextMenu ? styles.isUserContextMenu : ''}`}
                    style={{left: `${mouseX}px`, top: `${mouseY}px`}}
                >
                    <ul>
                        <li onClick={onClickCopy} className={styles.buttonAction}>Copy</li>
                        <li onClick={onClickDelete} className={styles.buttonAction}>Delete</li>
                    </ul>
                </div>

            </div>

        </div>
    )
}
export default ContextMenu;