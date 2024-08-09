import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  boxcolor,
  info,
  kuning,
  modalcolor,
  third,
} from '../../colors';
import Container from '../../microcomponents/container';
import {ButtonAddToCart} from '../../microcomponents/addtocartbutton';
import style from '../../style';
import ButtonBayar from '../../microcomponents/buttonbayar';
import PaymentHandler from '../../Webview';
import { ImgUri } from '../../../const';

import {TextLight} from '../../microcomponents/Text';
import Download from '../../microcomponents/download';
import {CartCheck, StarIcon} from '../../microcomponents/carticon/icon';
import {getRating} from '../../Functions';

const ProductsBox = ({products, payment}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [comments, setcomments] = useState(false);
  const show = () => {
    setshowmodal(true);
  };
  const close = () => {
    setshowmodal(false);
  };
  const product = products;
  // console.log(product);

  if (product) {
    const [rating, setr] = useState(0);

    return (
      <>
        <TouchableOpacity
          onPress={() =>
            !payment || product.status == 1
              ? setModalVisible(true)
              : setshowmodal(true)
          }>
          <View
            key={product.id}
            style={[
              {
                marginBottom: 20,
                marginTop: 20,
                overflow: 'hidden',
                borderRadius: 15,
                opacity: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                height: 500,
                backgroundColor: 'rgba(225,225,225,.1)',
                borderWidth: 1,
                borderColor: 'rgba(225,225,225,.4)',
                position: 'relative',
              },
            ]}>
            <ImageBackground
              source={{uri: `${ImgUri}/public/img/${product.gambar}`}}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  padding: 20,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={[styles.product, style.bold]}>
                    {product.product}
                  </Text>
                  <Text style={style.text}>
                    Rp {new Intl.NumberFormat('id-ID').format(product.harga)}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CartCheck
                    style={{
                      width: 35,
                    }}
                  />
                  <Text style={{color: third}}>{product.ordered}x</Text>
                </View>
              </View>
            </ImageBackground>
            <View
              style={{
                position: 'absolute',
                right: 0,
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <StarIcon fill={kuning} />
              <Text style={{color: kuning, fontSize: 16}}>
                {product.star ? product.star.slice(0, 3) : 'N/A'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {!payment && (
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={styles.closeModalButton}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={{fontWeight: '900'}}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      padding: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{width: 100}}>
                      <Image
                        source={{
                          uri: `${ImgUri}/public/img/${product.gambar}`,
                        }}
                        style={{width: 100, height: 100}}
                      />
                    </View>
                    <View style={{width: 'auto', marginLeft: 50}}>
                      <Text
                        style={{fontWeight: 700, fontSize: 30}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {product.product}
                      </Text>
                      <Text style={{marginBottom: 5}}>Tag: {product.tech}</Text>
                      <Text style={{marginBottom: 5}}>
                        Rating: {product.star ? product.star : 'not rated'}
                      </Text>

                      <Text style={[style.text, {color: 'black'}]}>
                        Rp{' '}
                        {new Intl.NumberFormat('id-ID').format(product.harga)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      padding: 20,
                      //  backgroundColor: 'red',
                      height: 370,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{marginBottom: 5}}>Desc:</Text>
                      <TouchableOpacity>
                        <Text style={{marginBottom: 5, color: info}}>
                          comments
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <ScrollView style={{position:'relative'}}>
                        <Text
                          style={{
                            marginBottom: 5,
                            // backgroundColor: 'blue',
                            height: '100%',
                            overflow: 'scroll',
                          }}>
                          {/* {product.desc === '' ? '-' : product.desc} */}
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Reiciendis architecto velit id asperiores vero
                          aut earum! Minus, ad dicta. Deleniti enim cupiditate
                          ea molestiae nam vitae at non quibusdam. Nemo ipsum
                          eum distinctio aliquam asperiores? Minima aperiam,
                          corrupti eveniet harum eum temporibus exercitationem
                          voluptates magnam, ab asperiores distinctio. Ipsam
                          temporibus error facilis sed reiciendis veniam illo,
                          blanditiis, deleniti eligendi recusandae porro
                          inventore voluptate sequi dolorum optio fuga
                          praesentium amet cupiditate, neque eius cumque in
                          minus reprehenderit tenetur! Vero rem, adipisci
                          reprehenderit eveniet dolor quod cum? Reiciendis quod
                          earum, ipsam ipsa recusandae nostrum esse sit, quia
                          aspernatur ducimus, quisquam deserunt iusto! Iure
                          voluptates dolorem consequatur nam placeat nulla in
                          aspernatur iste harum dolores. Cumque ad laborum
                          doloribus fugit, tempora aut. Doloribus porro
                          consectetur voluptatum libero culpa laborum commodi
                          qui labore eligendi explicabo. Alias fugit accusamus
                          eos aliquam praesentium vitae voluptatibus voluptates
                          pariatur, sequi itaque voluptate atque vero
                          repellendus officia minus ut et corrupti dolor in.
                          Quam velit, veniam corrupti similique sapiente beatae
                          sint repellat aperiam eaque ab nihil odit facere porro
                          dolorum, eos, magni hic. Voluptate molestiae sed quia
                          aliquid commodi quasi quas distinctio dolorum dolor
                          facilis accusantium officiis, tempora et laborum ex
                          sapiente soluta eius. Magnam quis perspiciatis
                          aspernatur iure.
                        </Text>
                      </ScrollView>
                    </View>
                  </View>

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 30,
                      width: '100%',
                      padding: 10,
                    }}>
                    <ButtonAddToCart productId={product.id} />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </>
    );
  } else {
    return (
      <>
        <TouchableOpacity>
          <View
            style={{
              marginBottom: 20,
              marginTop: 20,
              overflow: 'hidden',
              borderRadius: 15,
              backgroundColor: boxcolor,
              opacity: 1,
            }}>
            <View>
              <Image
                source={{
                  uri: `${ImgUri}/public/img/`,
                }}
                style={{width: '100%', height: 500}}
              />
            </View>

            <View style={{padding: 20}}>
              <Text style={[style.text, style.bold]}>404</Text>
              <Text style={style.text}>Not Found</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openModalButton: {
    backgroundColor: 'blue',
    padding: 10,
    color: 'white',
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'end',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'rgba(205,205,220,1)',
    borderRadius: 20,
    paddingRight: 15,
    // display: 'flex',
    // justifyContent:'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: -20,
    height: '70%',
  },
  modalView2: {
    width: '100%',
    margin: 20,
    backgroundColor: modalcolor,
    borderRadius: 20,
    paddingRight: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: -20,
    height: '60%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  product: {
    color: kuning,
    fontSize: 17,
  },
});

export default ProductsBox;
