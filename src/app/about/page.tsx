import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, User } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className='flex justify-center items-center py-12'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src='https://avatars.githubusercontent.com/u/150866883?v=4'
                alt='Saw Simon Linn'
              />
              <AvatarFallback>YN</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className='text-3xl'>Saw Simon Linn</CardTitle>
          <p className='text-muted-foreground'>Full-Stack Developer</p>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='mb-6 text-muted-foreground'>
            This project, Crypto Dash, is a cryptocurrency tracking application
            built with Next.js and Tailwind CSS. Special thanks to{' '}
            <a
              href='https://www.traversymedia.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary hover:underline'
            >
              Traversy Media (Brad)
            </a>{' '}
            for the invaluable tutorials and inspiration that guided the
            development of this app.
          </p>
          <div className='flex justify-center gap-4'>
            <a
              href='https://github.com/SawSimonLinn'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='outline'>
                {/* <Github className='mr-2 h-4 w-4' /> */}
                GitHub
              </Button>
            </a>
            <a
              href='https://linkedin.com/in/sawsimonlinn'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='outline'>
                {/* <Linkedin className='mr-2 h-4 w-4' /> */}
                LinkedIn
              </Button>
            </a>
            <a
              href='https://www.sawsimonlinn.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button>
                {/* <User className='mr-2 h-4 w-4' /> */}
                Portfolio
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
