import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigators/RootNavigator";
// import ApiComponent from "./component/ExchangeRate/ApiComponent";
// import Logoin from "./Logoin";
//import NewApp from "./NewApp";
import AddImg from "./component/AddImg";
import MyCollection from "./screens/MyCollection";
import WelcomeScreen from "./screens/WelcomeScreen";
import AddImgScreen from "./screens/AddImgScreen";
import ApiComponent from "./component/ExchangeRate/ApiComponent";
import InsertForm from "./InsertForm";
import Register from "./screens/Register";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}