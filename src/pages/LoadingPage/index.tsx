import styled from "styled-components"
import RocketLoading from "../../components/RocketLoading"

export default function LoadingPage() {
    return (
        <Container>
            <RocketLoading/>
        </Container>
    )
}

const Container = styled.div`
    position: absolute;
    top: 65px;
    width: 100%;
    height: 100vh;
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;
`
