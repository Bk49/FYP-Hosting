import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";
// Error pages import
import Error403 from "./components/pages/error-pages/403"
import Error404 from "./components/pages/error-pages/404"
// Group Question pages import
import GroupCreateQuestion from "./components/pages/group-pages/question-pages/GroupCreateQuestion"
import GroupShowQuestion from "./components/pages/group-pages/question-pages/GroupShowQuestion"
// Group pages import
import GroupAnnouncement from "./components/pages/group-pages/GroupAnnouncement"
import GroupAskAQuestion from "./components/pages/group-pages/GroupAskAQuestion"
import GroupAssignment from "./components/pages/group-pages/GroupAssignment"
import GroupLeaderboard from "./components/pages/group-pages/GroupLeaderboard"
import GroupMember from "./components/pages/group-pages/GroupMember"
import GroupProgress from "./components/pages/group-pages/GroupProgress"
// Learning Resources pages import
import LearningResources from "./components/pages/learning-resources-pages/LearningResources"
import LearningResourcesLevel from "./components/pages/learning-resources-pages/LearningResourcesLevel"
// Individual pages import
import AccountSettings from "./components/pages/individual-pages/AccountSettings"
import Assignment from "./components/pages/individual-pages/Assignment"
import Control from "./components/pages/individual-pages/Control"
import Game from "./components/pages/individual-pages/Game"
import Home from "./components/pages/individual-pages/Home"
import Leaderboard from "./components/pages/individual-pages/Leaderboard"
import Login from "./components/pages/individual-pages/Login"
import Overview from "./components/pages/individual-pages/Overview"
import Quiz from "./components/pages/individual-pages/Quiz"
import SignUp from "./components/pages/individual-pages/SignUp"
import Stats from "./components/pages/individual-pages/Stats"
import ViewPastQuiz from "./components/pages/individual-pages/ViewPastQuiz"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default App = () => {
    return (
        <NativeRouter>
            <Routes>
                {/* Error routes */}
                <Route exact path="/403" element={<Error403/>} />
                <Route exact path="/404" element={<Error404/>} />

                {/* Group Question Routes */}
                <Route exact path="/group_create_question" element={<GroupCreateQuestion/>} />
                <Route exact path="/group_show_question" element={<GroupShowQuestion/>} />

                {/* Group Routes */}
                <Route exact path="/groupqna" element={<GroupAskAQuestion/>} />
                <Route exact path="/group_announcement" element={<GroupAnnouncement/>} />
                <Route exact path="/group_assignment" element={<GroupAssignment/>} />
                <Route exact path="/group_members" element={<GroupMember/>} />
                <Route exact path="/group_leaderboard" element={<GroupLeaderboard/>} />
                <Route exact path="/group_progress" element={<GroupProgress/>} />

                {/* Learning Resources Routes */}
                <Route exact path="/learningresourceslevel" element={<LearningResourcesLevel/>} />
                <Route exact path="/learningresources" element={<LearningResources/>} />

                {/* Individual Pages Routes */}
                <Route exact path="/profile" element={<AccountSettings/>} />
                <Route exact path="/assignment" element={<Assignment/>} />
                <Route exact path="/control" element={<Control/>} />
                <Route exact path="/game" element={<Game/>} />
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/leaderboard" element={<Leaderboard/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/control" element={<Overview/>} />
                <Route exact path="/quiz" element={<Quiz/>} />
                <Route exact path="/signup" element={<SignUp/>} />
                <Route exact path="/stats" element={<Stats/>} />
                <Route exact path="/viewpastquiz" element={<ViewPastQuiz/>} />

            </Routes>
        </NativeRouter>,
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
