import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import styles from './Home.styles';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import ProductCard from '../components/molecules/ProductCard/ProductCard';
import SkeletonCard from '../components/molecules/SkeletonCard/SkeletonCard';
import {useThemeStore} from '../store/themeStore';
import {useAuthStore} from '../store/authStore';
import {useGetProductsFetch, useSearchProductFetch} from '../queries';
import {Product} from '../types/product.types';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';

const CreateHeaderButton = ({
  onPress,
  color,
}: {
  onPress: () => void;
  color: string;
}) => (
  <Text onPress={onPress} style={[styles.createText, {color}]}>
    Create
  </Text>
);

export default function Home() {
  const {colors} = useThemeStore();
  const [page, setPage] = useState(1);
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation<AppStackNavigationProp>();

  const headerRight = useCallback(
    () => (
      <CreateHeaderButton
        onPress={() => navigation.navigate('CreateProduct')}
        color={colors.textLinkColor}
      />
    ),
    [navigation, colors.textLinkColor],
  );

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      if (token) {
        setAccessToken(token);
      }
    })();
  }, [getAccessToken]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation, headerRight]);

  const applySorting = (selectedOrder: 'asc' | 'desc') => {
    setSortBy('price');
    setOrder(selectedOrder);
    setSearchQuery('');
    setIsSearching(false);
    setPage(1);
    setAllProducts([]);
    refetch();
    setIsFilterVisible(false);
  };

  const {data: searchResults, refetch: refetchSearch} = useSearchProductFetch(
    searchQuery,
    accessToken,
  );

  const onSearchSubmit = async () => {
    if (searchQuery.trim()) {
      setPage(1);
      setIsSearching(true);
      await refetchSearch();
    } else {
      setIsSearching(false);
    }
  };

  const {data, isFetching, refetch, isRefetching} = useGetProductsFetch({
    page,
    limit: 10,
    accessToken,
    sortBy,
    order,
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
    if (data?.data) {
      setAllProducts(prev => {
        const ids = new Set(prev.map((p: Product) => p._id));
        const newProducts = data.data.filter((p: Product) => !ids.has(p._id));
        return page === 1 ? data.data : [...prev, ...newProducts];
      });
    }
  }, [data, page]);

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
        data={isSearching ? searchResults || [] : allProducts}
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
            <Title text="Discover" textAlign="left" />
            <Text style={[styles.subtitle, {color: colors.textColor}]}>
              Find amazing products just for you
            </Text>
            <View style={styles.searchContainer}>
              <View style={styles.searchView}>
                <TextInput
                  placeholder="Search..."
                  isSearch={true}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={onSearchSubmit}
                />
              </View>
              <TouchableOpacity
                onPress={() => setIsFilterVisible(true)}
                style={styles.filterStyle}>
                <Feather name="filter" size={22} color={colors.textColor} />
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          isFetching && page === 1 ? (
            <View style={styles.skeletonList}>
              {Array.from({length: 6}).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
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
            <View style={styles.skeletonList}>
              {Array.from({length: 4}).map((_, idx) => (
                <SkeletonCard key={`footer-skeleton-${idx}`} />
              ))}
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
