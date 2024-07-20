import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";

function Home({ auth }) {
    return <div>Hello</div>;
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <ChatLayout children={page}></ChatLayout>
        </AuthenticatedLayout>
    );
};
export default Home;
