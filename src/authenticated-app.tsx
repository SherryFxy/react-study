import styled from "@emotion/styled"
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
        <Header>
            <HeaderLeft>
                <h3>Logo</h3>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
            </HeaderRight>
        </Header>
        <Nav>nav</Nav>
        <Main>
            <ProjectListScreen />
        </Main>
        <Aside>aside</Aside>
        <Footer>footer</Footer>
    </Container>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 6rem 1fr 6rem;
    grid-template-columns: 20rem 1fr 20rem;
    grid-template-areas: 
        "header header header"
        "nav main aside"
        "footer footer footer"
    ;
    height: 100vh;
`
const HeaderLeft = styled.div`
display: flex;
align-items: center;
`
const HeaderRight = styled.div``

// grid-area 用来给grid子元素起名字
const Header = styled.header`
grid-area: header;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`
const Main = styled.main`grid-area: main`
const Nav = styled.nav`grid-area: nav`
const Aside = styled.aside`grid-area: aside`
const Footer = styled.footer`grid-area: footer`