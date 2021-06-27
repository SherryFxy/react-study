import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState } from "react"
import { useDebounce } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"

export const ProjectListScreen = () => {
    // const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200);
    // const [list, setList] = useState([])
    const { isLoading, error, data: list } = useProjects(debounceParam)
    const { data: users } = useUsers()

    // useEffect(() => {
    //     run(client('projects', {data: cleanObject(debounceParam)}));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [debounceParam])

    // useMount(() => {
    //     client('users').then(setUsers);
    // })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`