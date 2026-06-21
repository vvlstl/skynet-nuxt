const chars = 'X#%&01░▒';

export const useScrambleText = (label: Ref<string>) => {
  const text = ref(label.value);
  const isHovered = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;

  watch(label, (newLabel) => {
    if (timer) clearInterval(timer);
    text.value = newLabel;
  });

  const scrambleText = (value: string) => {
    if (timer) clearInterval(timer);

    let count = 0;
    timer = setInterval(() => {
      count++;
      if (count > 4) {
        text.value = value;
        clearInterval(timer!);
        return;
      }

      const arr = value.split('');
      const idx = Math.floor(Math.random() * arr.length);
      arr[idx] = chars[Math.floor(Math.random() * chars.length)];
      text.value = arr.join('');
    }, 60);
  };

  const handleMouseEnter = () => {
    scrambleText(label.value);
    isHovered.value = true;
  };

  const handleMouseLeave = () => {
    if (timer) clearInterval(timer);
    text.value = label.value;
    isHovered.value = false;
  };

  return {
    text,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
};
