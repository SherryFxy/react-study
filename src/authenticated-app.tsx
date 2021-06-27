import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from "antd";

/**
 * flex 和 grid 各自的应用场景
 * 1. 一维布局用flex，二维布局用grid
 * 2. 从布局出发还是从内容出发
 * 从布局出发：先规划网格（一般数量比较固定），然后把元素往里填充
 * 从内容出发：现有一组内容(数量一般不固定)，然后希望它们在容器中自动填充
 */

export const AuthenticatedApp = () => {
    const {logout, user} = useAuth();
    const value: any = undefined
    return <Container> 
        {value.notExist}
        <Header between={true}>
            <HeaderLeft gap={true}>
                <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                {/* <button>登出</button> */}
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <Button type={'link'}  onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                    <Button type={'link'} onClick={e => e.preventDefault()}>
                        Hi, {user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>
}

const Container = styled.div`
    display: grid;
    height: 100vh;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
padding: 0 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`
const Main = styled.main``