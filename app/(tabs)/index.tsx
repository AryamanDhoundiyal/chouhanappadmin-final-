import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HolidayList from '../(tabs)/HolidayList'; // Adjust the path as necessary
import AddEmployee from '../(tabs)/AddEmployee';
import CBbuilder from "../(tabs)/CBbuilder";
import Leave from "../(tabs)/Leave";
import Notice from "../(tabs)/Notice";
import EmpStatus from "../(tabs)/EmpStatus";
import Profile from "../(tabs)/Profile";
import Login from '../(tabs)/Login';
import ListEmp from '../(tabs)/ListEmp';
import ViewAtt from '../(tabs)/ViewAtt';
import AddHolidayScreen from '../(tabs)/AddHolidayScreen';
import AddNoticeScreen from '../(tabs)/AddNoticeScreen';
import site from '../(tabs)/site'; // Adjust the import path as needed
import addsite from '../(tabs)/addsite'; // Adjust the import path as needed
import List from '../(tabs)/List';

import NoticeDetailsScreen from '../(tabs)/NoticeDetailsScreen';
import ConfirmedEmployee from '../(tabs)/ConfirmedEmployee';
import { AuthProvider, AuthContext } from '../../components/AuthContext'; // Import AuthProvider and AuthContext

const Stack = createNativeStackNavigator();

// Define the linking configuration for localhost
const linking = {
  prefixes: ['https://localhost:3001'], // Use your local development URL
  config: {
    screens: {
      TabTwoScreen: 'tab-two',
      Login: 'login',
      CBbuilder: 'CBbuilder',
      HolidayList: 'holiday-list',
      AddEmployee: 'add-employee',
      Leave: 'leave',
      Notice: 'notice',
      EmpStatus: 'employee-status',
      Profile: 'profile',
      ListEmp: 'employee-list',
      ViewAtt: 'view-attendance',
      AddHolidayScreen: 'add-holiday',
      AddNoticeScreen: 'add-notice',
      addsite: 'add-site',
      site: 'site',
      List: 'list',
      NoticeDetailsScreen: 'notice-details',
      ConfirmedEmployee: 'confirmed-employee',
    },
  },
};

const AppStack = () => {
  return (

    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CBbuilder" component={CBbuilder} options={{ title: 'Home' }} />
      <Stack.Screen name="HolidayList" component={HolidayList} options={{ title: 'Public Holidays' }} />
      <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ title: 'Add Employee' }} />
      <Stack.Screen name='Leave' component={Leave} options={{ title: 'Leave' }} />
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="EmpStatus" component={EmpStatus} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='ListEmp' component={ListEmp} />
      <Stack.Screen name='ViewAtt' component={ViewAtt} />
      <Stack.Screen name="AddHolidayScreen" component={AddHolidayScreen} options={{ title: 'Add Holiday' }} />
      <Stack.Screen name="AddNoticeScreen" component={AddNoticeScreen} />
      <Stack.Screen name="addsite" component={addsite} />
      <Stack.Screen name="site" component={site} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name="NoticeDetailsScreen" component={NoticeDetailsScreen} />
      <Stack.Screen name="ConfirmedEmployee" component={ConfirmedEmployee} />
    </Stack.Navigator>

  );
};

export default AppStack;

// const AuthStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name='Login' component={Login} />
//     </Stack.Navigator>
//   );
// };

// const App = () => {
//   const { isAuthenticated } = useContext(AuthContext); // Access authentication status from AuthContext

//   return (
//     <NavigationContainer linking={linking} independent={true}>
//       {isAuthenticated ? <AppStack /> : <AuthStack />} {/* Render stack based on authentication status */}
//     </NavigationContainer>
//   );
// };

// export default () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );
