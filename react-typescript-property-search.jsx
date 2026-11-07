//物件のデータ
type Property = {
  id: number;
  name: string;
  price: number;
  address: string;
  lat: number;
  lng: number;
};

const bukken1: Property = {
  id: 1,
  name: "ハティ",
  price: 85000,
  address: "埼玉県和光市白子",
  lat: 35,
  lng: 110,
};

const bukken2: Property = {
  id: 2,
  name: "ロティ",
  price: 95000,
  address: "埼玉県浦和市",
  lat: 45,
  lng: 105,
};

const bukken3: Property = {
  id: 3,
  name: "エティ",
  price: 100000,
  address: "埼玉県草加市",
  lat: 234,
  lng: 22,
};

const bukkens: Property[] = [bukken1, bukken2, bukken3];


//物件検索ページのコンポーネント
function PropertySearchPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return(
    <div>
      <PropertyList selectedId={selectedId} onSelect={setSelectedId} />
      <PropertyMap selectedId={selectedId} />
    </div>
  );
}

//物件マップ用のコンポーネント
type PropertyMapProps = {
  selectedId: number | null;
}

function PropertyMap({selectedId}: PropertyMapProps){
  return(
    selectedId === null ?
      <p>物件未選択</p>
      :
      <p>選択中ID：{selectedId}</p>
  );
}

//物件リスト用のコンポーネント
type PropertyListProps = {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function PropertyList({selectedId, onSelect}: PropertyListProps) {
  const [area, setArea] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

  const filteredBukkens = bukkens.filter((bukken) => {
    return (
      bukken.price <= maxPrice &&
      (
        area === "" ||
        bukken.address === area
      )
    );
  });

  return (
    <div>
      <select
        value={area}
        onChange={(event) => {
          setArea(event.target.value);
        }}
      >
        <option value="">すべて</option>
        <option value="埼玉県和光市白子">和光市</option>
        <option value="埼玉県草加市">草加市</option>
      </select>

      <select
        value={maxPrice}
        onChange={(event) => {
          setMaxPrice(Number(event.target.value));
        }}
      >
        <option value="80000">80,000円</option>
        <option value="100000">100,000円</option>
        <option value="120000">120,000円</option>
      </select>

      <p>検索結果：{filteredBukkens.length}件</p>

      {filteredBukkens.length === 0 ? (
        <p>該当する物件がありません</p>
      ) : (
        <ul>
          {filteredBukkens.map((filteredBukken) => (
            <li
              key={filteredBukken.id}
              onClick={() => {
                onSelect(filteredBukken.id);
              }}
            >
              <PropertyCard
                name={filteredBukken.name}
                price={filteredBukken.price}
                address={filteredBukken.address}
                isSelected={selectedId === filteredBukken.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


//物件カード用のコンポーネント
type PropertyCardProps = {
  name: string;
  price: number;
  address: string;
  isSelected: boolean;
}

function PropertyCard ({name, price, address, isSelected} :PropertyCardProps){
  return (
    <div className={isSelected ? "property-card-selected" : "property-card"}>
      <p>{name}</p>
      <p>{price}</p>
      <p>{address}</p>
      {isSelected ?
        <div>選択中</div>
        :
        null
      }
    </div>
  );
}
