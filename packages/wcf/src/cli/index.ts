import { setTimeout } from 'node:timers/promises';
import * as p from '@clack/prompts';
import color from 'picocolors';


async function main() {
    console.clear();
    await setTimeout(1000);

    p.intro(`${color.bgCyan(color.black(' create-app'))}`);

    const project = await p.group(
        {
            path: () => p.text({
                message: 'Where should we create your project?',
                placeholder: './your-awesome-project-name',
                validate: value => {
                    if (!value) return 'Please enter a path.'
                    if (value[0] !== '.') return 'Please enter a relative path.'
                }
            }),
            type: ({ results }) => p.select({
                message: `pick a project type within "${results.path}"`,
                initialValue: 'ts',
                maxItems: 5,
                options: [
                    { value: 'ts', label: 'Typescript' },
                    { value: 'js', label: 'JavaScript' }
                ]
            }),
            install: () => p.confirm({
                message: 'Install dependencies?',
                initialValue: false,
            }),
        },
        {
            onCancel: () => {
                p.cancel('Operation cancelled'),
                process.exit(0);
            }
        }
    )

    if (project.install) {
        const s = p.spinner();
        s.start('Installing via pnpm');
        await setTimeout(2500);
        s.stop('Installed vie pnpm');
    }

    let nextSteps = `All set!\nNext step: cd ${project.path}\n${project.install ? '' : 'pnpm install\n'}pnpm dev`;

    p.note(nextSteps, 'Next steps.');

    p.outro(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`);
}

main().catch(console.error);