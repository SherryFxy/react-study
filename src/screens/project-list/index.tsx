import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState } from "react"
import { useDebounce, useDocumentTitle } from "utils"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProjects } from "utils/project"
import { useUsers } from "utils/user"
import { useUrlQueryParam } from "utils/url"
import { useProjectSearchParams } from "./util"

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表', false)

    // 基本类型，组件状态，都可以放在依赖里；非组建状态对象，绝不可以放到依赖里
    const [param, setParam] = useProjectSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
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
        <List refrash={retry} loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`