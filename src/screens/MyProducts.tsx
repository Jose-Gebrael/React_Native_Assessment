import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './MyProducts.styles';
import {Title} from '../components/atoms/Title';
import ProductCard from '../components/molecules/ProductCard/ProductCard';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useGetProductsFetch, useGetProfileFetch} from '../queries';
import {Product} from '../types/product.types';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function MyProducts() {
  const {colors} = useThemeStore();
  const [page, setPage] = useState(1);
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const {data: profileData} = useGetProfileFetch(accessToken);
  const userEmail = profileData?.data?.user?.email || '';

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessToken(token);
      }
    })();
  }, [getAccessToken]);

  const applySorting = (selectedOrder: 'asc' | 'desc') => {
    setSortBy('price');
    setOrder(selectedOrder);
    setIsSearching(false);
    setPage(1);
    setAllProducts([]);
    refetch();
    setIsFilterVisible(false);
  };

  const {data, isFetching, refetch, isRefetching} = useGetProductsFetch({
    page,
    limit: 1000,
    accessToken,
    sortBy: sortBy,
    order: order,
  });

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setAllProducts([]);
      refetch();
    }, [refetch]),
  );

  const hasNextPage = data?.pagination?.hasNextPage ?? false;

  useEffect(() => {
    if (!data?.data || !userEmail) {
      return;
    }

    const filteredByEmail = data.data.filter(
      (product: Product) => product.user?.email === userEmail,
    );

    setAllProducts(prevProducts => {
      const existingIds = new Set(prevProducts.map(product => product._id));

      const newProducts = filteredByEmail.filter(
        (product: Product) => !existingIds.has(product._id),
      );

      return page === 1 ? filteredByEmail : [...prevProducts, ...newProducts];
    });
  }, [data, page, userEmail]);

  const handleLoadMore = () => {
    if (!isFetching && hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = async () => {
    setPage(1);
    setAllProducts([]);
    await refetch();
  };

  const renderProduct = ({item}: {item: Product}) => (
    <ProductCard product={item} />
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <FlatList
        data={allProducts}
        renderItem={renderProduct}
        keyExtractor={item => String(item._id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={colors.textLinkColor}
            colors={[colors.textLinkColor]}
          />
        }
        ListHeaderComponent={
          <View>
            <Title text="My Products (beta)" textAlign="left" style={styles.title} />
            <Text style={[styles.subtitle, {color: colors.textColor}]}>
              Everything you created.
            </Text>
          </View>
        }
        ListEmptyComponent={
          isFetching && page === 1 ? (
            <View style={styles.loadingInitialContainer}>
              <ActivityIndicator size="large" color={colors.textLinkColor} />
              <Text
                style={[styles.loadingInitialText, {color: colors.textColor}]}>
                Loading Products...
              </Text>
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={[styles.noResultsText, {color: colors.textColor}]}>
                {isSearching
                  ? 'No products match your search.'
                  : 'No products found.'}
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          isFetching && hasNextPage ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color={colors.textLinkColor} />
              <Text style={[styles.loadingMoreText, {color: colors.textColor}]}>
                Loading more...
              </Text>
            </View>
          ) : null
        }
      />
      <Modal
        isVisible={isFilterVisible}
        onBackdropPress={() => setIsFilterVisible(false)}>
        <View
          style={[
            styles.filterDropdown,
            {backgroundColor: colors.cardBackgroundColor},
          ]}>
          <TouchableOpacity
            onPress={() => applySorting('asc')}
            style={styles.asc}>
            <Text style={{color: colors.textColor}}>$ Price ↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => applySorting('desc')}
            style={styles.desc}>
            <Text style={{color: colors.textColor}}>$ Price ↓</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
