import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useTheme, THEME_COLORS, ThemeColorId } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeColorSwitcherProps {
  className?: string;
  showLabels?: boolean;
}

export default function ThemeColorSwitcher({ className = '', showLabels = false }: ThemeColorSwitcherProps) {
  const { themeMode, themeColor, setThemeColor, toggleThemeMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const colorKeys: ThemeColorId[] = ['cyan', 'purple', 'emerald', 'orange', 'rose'];

  return (
    <div
      id="theme-color-switcher-pill"
      className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 select-none ${
        themeMode === 'light'
          ? 'bg-white/90 border border-zinc-200/90 shadow-md shadow-zinc-300/40 text-zinc-800'
          : 'bg-zinc-950/90 border border-white/20 shadow-xl shadow-black/80 text-white'
      } backdrop-blur-xl ${className}`}
      role="toolbar"
      aria-label="Theme Mode, Language and Color Switcher"
    >
      {/* Dark / Light Mode Toggle Button */}
      <button
        type="button"
        id="theme-mode-toggle-btn"
        onClick={toggleThemeMode}
        title={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={themeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`p-1 rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center ${
          themeMode === 'light'
            ? 'text-zinc-700 hover:text-amber-500'
            : 'text-zinc-200 hover:text-amber-300'
        }`}
      >
        {themeMode === 'dark' ? (
          <Sun className="w-4 h-4 transition-colors" />
        ) : (
          <Moon className="w-4 h-4 transition-colors" />
        )}
      </button>

      {/* Vertical Divider */}
      <span
        aria-hidden="true"
        className={`w-px h-4 ${themeMode === 'light' ? 'bg-zinc-300' : 'bg-white/20'}`}
      />

      {/* BN / EN Language Switcher (Between Dark Mode and Accent Colors) */}
      <button
        type="button"
        id="header-lang-switch-btn"
        onClick={toggleLanguage}
        title={language === 'en' ? 'বাংলা সংস্করণে পরিবর্তন করুন (Switch to Bangla)' : 'Switch to English version'}
        aria-label={`Current language is ${language === 'en' ? 'English' : 'Bangla'}. Click to toggle.`}
        className={`px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-tight transition-all flex items-center gap-1 cursor-pointer ${
          themeMode === 'light'
            ? 'hover:bg-zinc-100 active:bg-zinc-200 text-zinc-700'
            : 'hover:bg-white/10 active:bg-white/15 text-zinc-300'
        }`}
      >
        <span
          className={`transition-colors ${
            language === 'bn'
              ? 'text-[var(--color-primary)] font-extrabold underline decoration-2 underline-offset-2'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          BN
        </span>
        <span className="text-zinc-500 font-normal">/</span>
        <span
          className={`transition-colors ${
            language === 'en'
              ? 'text-[var(--color-primary)] font-extrabold underline decoration-2 underline-offset-2'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          EN
        </span>
      </button>

      {/* Vertical Divider */}
      <span
        aria-hidden="true"
        className={`w-px h-4 ${themeMode === 'light' ? 'bg-zinc-300' : 'bg-white/20'}`}
      />

      {/* 5 Accent Color Swatches */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {colorKeys.map((key) => {
          const config = THEME_COLORS[key];
          const isSelected = themeColor === key;

          return (
            <button
              key={key}
              type="button"
              id={`theme-color-btn-${key}`}
              onClick={() => setThemeColor(key)}
              title={config.name}
              aria-label={`Select ${config.name} Theme`}
              aria-pressed={isSelected}
              style={{
                backgroundColor: config.dotHex,
                boxShadow: isSelected ? `0 0 10px ${config.glow}` : undefined,
              }}
              className={`relative w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-950 dark:ring-offset-zinc-950'
                  : 'opacity-85 hover:opacity-100 hover:scale-110 ring-0'
              }`}
            >
              {isSelected && (
                <span className="sr-only">(Active)</span>
              )}
            </button>
          );
        })}
      </div>

      {showLabels && (
        <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-zinc-400 pl-1">
          {THEME_COLORS[themeColor].name}
        </span>
      )}
    </div>
  );
}
