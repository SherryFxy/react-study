import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
// import * as qs from 'qs'
import { cleanObject, useDebounce, useMount } from "utils"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200);
    const [list, setList] = useState([])
    const client = useHttp();

    useEffect(() => {
        client('projects', {data: cleanObject(debounceParam)}).then(setList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers);
    })
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`