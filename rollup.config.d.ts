declare namespace _default {
    const input: string;
    const output: {
        file: any;
        format: string;
        sourcemap: boolean;
        exports: string; /** Disable warning for default imports */
    }[];
    const plugins: any[];
}
export default _default;
