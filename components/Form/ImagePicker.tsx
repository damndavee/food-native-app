import { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button } from 'native-base';
import { launchCameraAsync, useCameraPermissions, PermissionStatus, launchImageLibraryAsync } from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/constants';

export type ImagePickerProps = {
    onSelectImage: (url: string) => void;
    pickedImage: string;
}

const ImagePicker = (props: ImagePickerProps) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if(cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(cameraPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert('insufficient Permissions!', 'You need to grant camer permissions.');
            return false;
        }

        return true;
    }
    
    const pickImageFromDevice = async () => {
        const image = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 16],
            quality: 0.5
        })

        props.onSelectImage(image.assets![0].uri);
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();

        if(!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 16],
            quality: 0.5,
        })

        props.onSelectImage(image.assets![0].uri);
    }

    let imagePreview = <Text style={styles.imageText}>No image taken yet.</Text>

    if(props.pickedImage) {
        imagePreview = <Image resizeMode='cover' style={styles.image} source={{uri: props.pickedImage}} />;
    }

  return (
    <View style={styles.imagePickerContainer}>
        <View style={styles.controls}>
            <Button android_ripple={{color: '#ccc'}} style={styles.button} flex={1} mr={2} leftIcon={<Ionicons name='camera' size={20} color={Colors.text} />} onPress={takeImageHandler} >Take a photo</Button>
            <Button android_ripple={{color: '#ccc'}} leftIcon={<Ionicons name='desktop' size={20} color={Colors.text} />} onPress={pickImageFromDevice}>Chose photo from device</Button>
        </View>
      <View style={styles.imageContainer}>
        {imagePreview}
      </View>
    </View>
  )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePickerContainer: {
       flex: 1,
    },
    controls: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
        height: 250,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageText: {
        color: Colors.text 
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})