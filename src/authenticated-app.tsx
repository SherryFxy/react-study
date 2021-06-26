import styled from "@emotion/styled"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"

/**
 * flex 和 grid 各自的应用场景
 * 1. 一维布局用flex，二维布局用grid
 * 2. 从布局出发还是从内容出发
 * 从布局出发：先规划网格（一般数量比较固定），然后把元素往里填充
 * 从内容出发：现有一组内容(数量一般不固定)，然后希望它们在容器中自动填充
 */

export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
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
/* display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between; */
`
const Main = styled.main``