import { Drawer, Button } from "antd"

export const ProjectModal = (props: {projectModalOpen: boolean, onClose: () => void}) => {
    return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}>
        <span>PeojectModal</span>
        <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
}