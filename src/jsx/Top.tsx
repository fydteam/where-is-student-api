const Layout = (props: { children?: any }) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    )
}

export const Top = (props: { messages: string[] }) => {
    return (
        <Layout>
            <h1>Hello Hono!</h1>
            <ul>
                {props.messages.map((message) => {
                    return <li>{message}!!</li>
                })}
            </ul>
        </Layout>
    )
}