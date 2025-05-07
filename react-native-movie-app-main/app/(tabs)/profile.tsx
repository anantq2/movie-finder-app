import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-white flex-1 px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        <Image source={icons.person} className="w-20 h-20" tintColor="#000" />
        <Text className="text-gray-800 text-lg">You are not signed in.</Text>
        <Text className="text-gray-500 text-base text-center">
          Profile information will appear here after you log in.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
