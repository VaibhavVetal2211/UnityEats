import { useState, useEffect } from "react";
import { Command } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchSuggestionsProps {
  searchTerm: string;
  onSelect: (value: string) => void;
  recentSearches: string[];
}

export const SearchSuggestions = ({ searchTerm, onSelect, recentSearches }: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const mockSuggestions = recentSearches.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(mockSuggestions);
  }, [searchTerm, recentSearches]);

  if (!searchTerm || searchTerm.length < 2) return null;

  return (
    <div className="absolute w-full z-10 bg-background border rounded-md shadow-lg mt-1">
      <ScrollArea className="h-[200px]">
        <Command>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => onSelect(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </Command>
      </ScrollArea>
    </div>
  );
};