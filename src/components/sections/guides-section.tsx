import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"

interface Guide {
  id: string
  title: string
  description: string
  content: string
  author: string
  date: string
}

export function GuidesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [guides, setGuides] = useState<Guide[]>([
    {
      id: "1",
      title: "Гайд для новичков",
      description: "Основы игры и первые шаги в мире богов",
      content: "Начните свой путь с выбора фракции. Каждая фракция имеет уникальные бонусы и стиль игры...",
      author: "Администратор",
      date: "2024-01-15"
    },
    {
      id: "2",
      title: "Строительство империи",
      description: "Как эффективно развивать города и экономику",
      content: "Правильное размещение зданий критически важно. Начните с храма в центре города...",
      author: "Администратор",
      date: "2024-01-20"
    },
    {
      id: "3",
      title: "Битвы и альянсы",
      description: "Тактика ведения войн и создания союзов",
      content: "Координация с союзниками - ключ к победе. Используйте чат альянса для планирования атак...",
      author: "Администратор",
      date: "2024-01-25"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGuide, setNewGuide] = useState({
    title: "",
    description: "",
    content: "",
    author: ""
  })

  const handleCreateGuide = () => {
    if (!newGuide.title || !newGuide.description || !newGuide.content || !newGuide.author) {
      return
    }

    const guide: Guide = {
      id: Date.now().toString(),
      ...newGuide,
      date: new Date().toISOString().split('T')[0]
    }

    setGuides([guide, ...guides])
    setNewGuide({ title: "", description: "", content: "", author: "" })
    setIsDialogOpen(false)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center overflow-y-auto px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl py-12">
        <div
          className={`mb-8 flex items-center justify-between transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Гайды
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ Полезные советы и стратегии</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Icon name="Plus" size={20} />
                Создать гайд
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создать новый гайд</DialogTitle>
                <DialogDescription>
                  Поделитесь своими знаниями и опытом с другими игроками
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Название гайда</Label>
                  <Input
                    id="title"
                    placeholder="Например: Лучшие стратегии для новичков"
                    value={newGuide.title}
                    onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Краткое описание</Label>
                  <Input
                    id="description"
                    placeholder="Опишите суть гайда в одном предложении"
                    value={newGuide.description}
                    onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Содержание гайда</Label>
                  <Textarea
                    id="content"
                    placeholder="Подробно опишите свой гайд..."
                    className="min-h-[200px]"
                    value={newGuide.content}
                    onChange={(e) => setNewGuide({ ...newGuide, content: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Автор</Label>
                  <Input
                    id="author"
                    placeholder="Ваше имя или ник"
                    value={newGuide.author}
                    onChange={(e) => setNewGuide({ ...newGuide, author: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateGuide}>
                  Опубликовать
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <Card
              key={guide.id}
              className={`transition-all duration-700 hover:shadow-lg ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="User" size={14} />
                  <span>{guide.author}</span>
                  <span>•</span>
                  <span>{guide.date}</span>
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-foreground/80">{guide.content}</p>
                <Button variant="link" className="mt-4 px-0">
                  Читать далее
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
