export const formatToClientDate = (date: Date | undefined): string => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
}