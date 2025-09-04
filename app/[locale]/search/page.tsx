"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Filter, Download, MapPin, Layers, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatBudgetAmount } from "@/lib/utils";

// Mock search results
const mockSearchResults = [
  {
    id: "apbn-2025-pendidikan-001",
    name: "Program Pendidikan Dasar",
    category: "Pendidikan",
    subcategory: "Pendidikan Dasar",
    amount: 156800000000000,
    ministry: "Kemendikbudristek",
    year: 2025,
    region: "National",
    type: "APBN",
    description: "Program peningkatan kualitas pendidikan dasar di seluruh Indonesia",
  },
  {
    id: "apbn-2025-kesehatan-002",
    name: "Program Jaminan Kesehatan Nasional",
    category: "Kesehatan",
    subcategory: "Jaminan Sosial",
    amount: 89200000000000,
    ministry: "Kemenkes",
    year: 2025,
    region: "National",
    type: "APBN",
    description: "Pembiayaan program JKN untuk seluruh rakyat Indonesia",
  },
  {
    id: "apbd-jakarta-infrastruktur-003",
    name: "Pembangunan LRT Jakarta",
    category: "Infrastruktur",
    subcategory: "Transportasi",
    amount: 12500000000000,
    ministry: "Dishub DKI",
    year: 2025,
    region: "DKI Jakarta",
    type: "APBD",
    description: "Pembangunan Light Rail Transit fase 2 untuk Jakarta",
  },
  {
    id: "apbn-2025-sosial-004",
    name: "Program Keluarga Harapan",
    category: "Perlindungan Sosial",
    subcategory: "Bantuan Sosial",
    amount: 45600000000000,
    ministry: "Kemensos",
    year: 2025,
    region: "National",
    type: "APBN",
    description: "Program bantuan tunai bersyarat untuk keluarga miskin",
  },
];

interface SearchFilters {
  year: string;
  category: string;
  type: string;
  region: string;
  minAmount: string;
  maxAmount: string;
}

function SearchResults({ results, query, locale }: { results: any[]; query: string; locale: string }) {
  const [sortBy, setSortBy] = useState("amount");
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedResults = [...results].sort((a, b) => {
    const multiplier = sortOrder === "desc" ? -1 : 1;
    if (sortBy === "amount") {
      return (a.amount - b.amount) * multiplier;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name) * multiplier;
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Ditemukan {results.length} hasil untuk "{query}"
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("name")}
            className="flex items-center space-x-1"
          >
            <span>Nama</span>
            {sortBy === "name" && (
              sortOrder === "desc" ? <SortDesc className="h-3 w-3" /> : <SortAsc className="h-3 w-3" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("amount")}
            className="flex items-center space-x-1"
          >
            <span>Jumlah</span>
            {sortBy === "amount" && (
              sortOrder === "desc" ? <SortDesc className="h-3 w-3" /> : <SortAsc className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      {sortedResults.map((result) => (
        <Card key={result.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg text-gray-900">
                  {result.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {result.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {result.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {result.year}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  {formatBudgetAmount(result.amount, locale)}
                </div>
                <p className="text-sm text-gray-500">{result.region}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              {result.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Layers className="h-3 w-3" />
                  <span>{result.subcategory}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{result.ministry}</span>
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Lihat Detail
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    year: "",
    category: "",
    type: "",
    region: "",
    minAmount: "",
    maxAmount: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(mockSearchResults);

  const t = useTranslations("search");

  const handleSearch = () => {
    const filtered = mockSearchResults.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.ministry.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const clearFilters = () => {
    setFilters({
      year: "",
      category: "",
      type: "",
      region: "",
      minAmount: "",
      maxAmount: "",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pencarian Anggaran
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cari dan filter item anggaran spesifik dari APBN dan APBD seluruh Indonesia
            </p>
          </div>

          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari program, kategori, atau kementerian..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button onClick={handleSearch} className="px-6">
                  Cari
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tahun
                      </label>
                      <select
                        value={filters.year}
                        onChange={(e) => setFilters({...filters, year: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      >
                        <option value="">Semua Tahun</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      >
                        <option value="">Semua Kategori</option>
                        <option value="pendidikan">Pendidikan</option>
                        <option value="kesehatan">Kesehatan</option>
                        <option value="infrastruktur">Infrastruktur</option>
                        <option value="perlindungan_sosial">Perlindungan Sosial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jenis
                      </label>
                      <select
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      >
                        <option value="">APBN & APBD</option>
                        <option value="APBN">APBN</option>
                        <option value="APBD">APBD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Daerah
                      </label>
                      <select
                        value={filters.region}
                        onChange={(e) => setFilters({...filters, region: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      >
                        <option value="">Semua Daerah</option>
                        <option value="National">Nasional</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anggaran Min (Triliun)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Anggaran Max (Triliun)
                      </label>
                      <input
                        type="number"
                        placeholder="∞"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                        className="w-full p-2 border border-gray-200 rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Reset
                    </Button>
                    <Button size="sm" onClick={handleSearch}>
                      Terapkan Filter
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setQuery("pendidikan")}>
              Pendidikan
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuery("kesehatan")}>
              Kesehatan
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuery("infrastruktur")}>
              Infrastruktur
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuery("subsidi")}>
              Subsidi
            </Button>
            <Button variant="outline" size="sm" onClick={() => setQuery("Jakarta")}>
              Jakarta
            </Button>
          </div>

          {/* Search Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Hasil Pencarian
              </h2>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Ekspor Hasil</span>
              </Button>
            </div>

            <SearchResults results={searchResults} query={query} locale="id-ID" />

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Sebelumnya
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Selanjutnya
              </Button>
            </div>
          </div>

          {/* Search Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pencarian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {searchResults.length}
                  </div>
                  <p className="text-sm text-gray-600">Program Ditemukan</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {formatBudgetAmount(
                      searchResults.reduce((sum, item) => sum + item.amount, 0),
                      "id-ID"
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Total Nilai</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {new Set(searchResults.map(r => r.category)).size}
                  </div>
                  <p className="text-sm text-gray-600">Kategori Unik</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {new Set(searchResults.map(r => r.ministry)).size}
                  </div>
                  <p className="text-sm text-gray-600">Kementerian</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}