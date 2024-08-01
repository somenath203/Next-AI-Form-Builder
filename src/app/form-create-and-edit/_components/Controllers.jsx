import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Controllers = ({ selectedTheme, setSelectedTheme, selectedBackground, setSelectedBackgroundTheme  }) => {

  const formThemeNames = [
    { id: 1, themeName: 'light' },
    { id: 2, themeName: 'dark' },
    { id: 3, themeName: 'black' },
    { id: 4, themeName: 'aqua' },
    { id: 5, themeName: 'bumblebee' },
    { id: 6, themeName: 'cmyk' },
    { id: 7, themeName: 'corporate' },
    { id: 8, themeName: 'cupcake' },
    { id: 9, themeName: 'cyberpunk' },
    { id: 10, themeName: 'dracula' },
    { id: 11, themeName: 'emerald' },
    { id: 12, themeName: 'fantasy' },
    { id: 13, themeName: 'forest' },
    { id: 14, themeName: 'garden' },
    { id: 15, themeName: 'halloween' },
    { id: 16, themeName: 'lemonade' },
    { id: 17, themeName: 'lofi' },
    { id: 18, themeName: 'luxury' },
    { id: 19, themeName: 'pastel' },
    { id: 20, themeName: 'retro' },
    { id: 21, themeName: 'synthwave' },
    { id: 22, themeName: 'valentine' },
    { id: 23, themeName: 'wireframe' },
    { id: 24, themeName: 'winter' },
  ];  

  const backgroundThemeNames = [
    { id: 1, themeName: 'White', gradient: 'linear-gradient(to right, #ffffff, #ffffff)' },
    { id: 2, themeName: 'Sunrise', gradient: 'linear-gradient(to right, #ff9933, #66b3ff)' },
    { id: 3, themeName: 'Sunset', gradient: 'linear-gradient(to right, #ff5e3a, #f0cafc)' },
    { id: 4, themeName: 'Ocean', gradient: 'linear-gradient(to right, #f3cea2, #185a93)' },
    { id: 5, themeName: 'Forest', gradient: 'linear-gradient(to right, #138808, #2bcb00)' },
    { id: 6, themeName: 'Sky', gradient: 'linear-gradient(to right, #2bcfe8, #7368aa)' },
    { id: 7, themeName: 'Neon', gradient: 'linear-gradient(to right, #00f2ff, #00c9ff)' },
    { id: 8, themeName: 'Grapefruit', gradient: 'linear-gradient(to right, #ffc0cb, #f7cac9)' },
    { id: 9, themeName: 'Mint', gradient: 'linear-gradient(to right, #9dff95, #cfdc83)' },
  ]

  return (
    <div className='flex flex-col gap-6'>


      <div className='flex flex-col gap-3'>

        <h2>Select Form Theme</h2>

        <Select value={selectedTheme} onValueChange={(value) => setSelectedTheme(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {formThemeNames.map((themename) => (
              <SelectItem value={themename.themeName} key={themename.id}>{themename.themeName}</SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>


      <div className='flex flex-col gap-3'>

        <h2>Select Form Background Theme</h2>

        <Select value={selectedBackground} onValueChange={(value) => setSelectedBackgroundTheme(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {backgroundThemeNames.map((themename) => (
              <SelectItem value={themename.gradient} key={themename.id}>{themename.themeName}</SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

    </div>
  );
};

export default Controllers;
