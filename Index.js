//import { StyleSheet, Animated, View, Dimensions, StatusBar, FlatList, Image } from 'react-native'
//import React, { useRef, useState } from 'react'

const { width, height } = Dimensions.get('screen');
//data of images
//const data = [
 //  // 'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
//    'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
 //   'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',    'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
//    'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',//    'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  //  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200'

//]

const imageW = width * 0.5;
const imageH = imageW * 1.7;
export default function CarouselAnimation() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [activeIndex, setActiveIndex] = useState(0)

    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <StatusBar hidden />
            <View style={styles.fullImg}>
                {data.map((image, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width
                    ]
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0]
                    })
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 1]
                    })
                    return <Animated.Image
                        key={`image-${index}`}
                        source={{ uri: image }}
                        style={[styles.fullImg, { opacity, transform: [{ scale }] }]}
                        blurRadius={15}
                    />
                })}
            </View>
            <Animated.FlatList
                data={data}
                onMomentumScrollEnd={(e) => {
                    scrollToActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width))
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={(_, index) => index.toString()}
                pagingEnabled
                horizontal
                renderItem={({ item }) => {
                    return <View style={{
                        width: width, justifyContent: "center", alignItems: "center", alignSelf: "center",

                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 4,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 4.65,
                        elevation: 8,

                    }}>
                        <Image source={{ uri: item }} style={{ width: imageH, height: imageH, borderRadius: 16, alignSelf: "center", alignItems: "center" }} resizeMode='cover' />

                    </View>

                }}

            />



        </View>
    )
}

const styles = StyleSheet.create({
    fullImg: {
        position: "absolute",
        width: width,
        height: height,
        zIndex: -20000,
        // backgroundColor:"red"
    }
}
